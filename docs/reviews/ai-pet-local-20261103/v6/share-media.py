from pathlib import Path
import struct
import subprocess
import sys

def png(source: Path, target: Path):
    data = source.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    out = bytearray(data[:8])
    index = 8
    while index < len(data):
        size = struct.unpack('>I', data[index:index+4])[0]
        kind = data[index+4:index+8]
        if kind in (b'IHDR', b'IDAT', b'IEND'):
            out.extend(data[index:index+12+size])
        index += 12 + size
    target.write_bytes(out)

def mp4(source: Path, target: Path):
    temp = target.with_suffix('.tail.mp4')
    subprocess.run(['ffmpeg', '-n', '-loglevel', 'error', '-i', str(source), '-map', '0:v:0', '-c', 'copy', '-bsf:v', 'filter_units=remove_types=6', '-map_metadata', '-1', '-map_chapters', '-1', '-metadata', 'comment=', '-metadata', 'encoder=', '-metadata:s:v:0', 'encoder=', str(temp)], check=True)
    data = temp.read_bytes()
    moov_start = data.index(b'moov') - 4
    moov = data[moov_start:]
    children = bytearray(b'moov')
    index = 8
    while index < len(moov):
        size = int.from_bytes(moov[index:index+4], 'big')
        kind = moov[index+4:index+8]
        assert size >= 8
        if kind != b'udta':
            children.extend(moov[index:index+size])
        index += size
    moov = bytearray((len(children)+4).to_bytes(4, 'big') + children)
    shift = len(moov)
    index = 0
    while True:
        found = moov.find(b'stco', index)
        if found < 0:
            break
        count = int.from_bytes(moov[found+8:found+12], 'big')
        for entry in range(count):
            offset = found + 12 + entry * 4
            value = int.from_bytes(moov[offset:offset+4], 'big')
            moov[offset:offset+4] = (value + shift).to_bytes(4, 'big')
        index = found + 12 + count * 4
    assert data[4:8] == b'ftyp'
    ftyp_size = int.from_bytes(data[:4], 'big')
    target.write_bytes(data[:ftyp_size] + moov + data[ftyp_size:moov_start])

source, target = map(Path, sys.argv[1:3])
if target.exists() or target.with_suffix('.tail.mp4').exists():
    raise SystemExit('Refusing to overwrite an existing output')
{'png': png, 'mp4': mp4}[source.suffix[1:]](source, target)
