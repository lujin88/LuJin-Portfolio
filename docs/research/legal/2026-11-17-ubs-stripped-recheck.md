# UBS 剔除版复核（legal，非法律意见）2026-11-17
范围：~/Desktop/Presentation/CA/ubs-deck-private-stripped/（119 文件，44M）。
| 项目 | 问题 | 依据 | 建议 | 阻塞推送 |
|---|---|---|---|---|
| 占位图 | 37 张 7767B 同一占位，已验 | — | OK | 否 |
| v3/same-morning.html、placements-motion.html、placements-transition.html | 内嵌 base64 PNG（324KB，各 2 处）= 完整 UBS「CAWB 2020+」Book View 截图，含 UBS 标志、界面、客户姓名、地址、日历 | OR 321a Abs.4；StGB 162；UWG 6（待确认） | 剔除内嵌图，换占位 | 是 |
| index.html 内嵌 png 17KB | 空白图 | — | OK | 否 |
| slide-01…25 等保留图（slide-18/20 已看） | AI 生成风格抽象图，无 UBS 界面；slide-20 含真实公司名（Apple 等）+虚构数据，待确认无误导 | 待确认 | 可留；其余缩略图级别已看 | 否 |
| index.html 外链 | Figma proto/embed（Kn8w…）、api.fontshare.com、cdn.jsdelivr.net remixicon | FADP/GDPR：访问者 IP 传第三方；Figma 原型可能含 UBS 界面 | 私有 repo 不阻塞；上线前去掉或本地化；Figma 原型内容待 Lu 确认 | 否（私有） |
| 字体 | 仍引用 Satoshi（woff2 已剔，Fontshare 线上加载） | Fontshare 许可待确认 | 不上传文件，可 | 否 |
| UBS logo svg ×3 | 见 #16116/#16121 | MSchG Art.13（待确认） | 私有可留；注意 ubs-logo.svg 与 -white 差 1 字节 | 否 |
| 文案 | index/README/v3 html 文案未逐行读 | — | 仍待查 | 待查 |
