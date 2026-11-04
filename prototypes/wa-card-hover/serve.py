"""Local review server. Existing character clips are read from the site checkout."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=4658)
parser.add_argument('--site', type=Path, required=True)
args = parser.parse_args()
clips = args.site / 'public/assets/videos/lab/weather-aquarium'
allowed = {'pose-idle-v1.mp4', 'pose-wave-v2.mp4',
           'pose-get-dressed-v1.mp4', 'pose-walk-explore-v21.mp4'}

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path.startswith('/media/'):
            name = path.removeprefix('/media/')
            if name not in allowed or not (clips / name).is_file():
                self.send_error(404)
                return
            data = (clips / name).read_bytes()
            self.send_response(200)
            self.send_header('Content-Type', 'video/mp4')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        super().do_GET()

server = ThreadingHTTPServer(('127.0.0.1', args.port),
    partial(Handler, directory=str(Path(__file__).parent)))
print(f'Review: http://127.0.0.1:{args.port}/scene.html', flush=True)
server.serve_forever()
