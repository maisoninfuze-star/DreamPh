#!/usr/bin/env python3
import os, json, urllib.request, sys
FAL = os.environ.get("FAL_KEY")
if not FAL: sys.exit("No FAL_KEY")
OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

STYLE = ("cinematic editorial spa photography, warm candlelight, soft natural light, "
         "moody muted warm tones, deep gentle shadows, shallow depth of field, fine film grain, "
         "elegant intimate luxury wellness, calm and sensorial, high-end magazine aesthetic, "
         "no text, no watermark, no logo")

JOBS = [
  ("hero",        "a serene candlelit Asian spa massage room, a woman lying on a massage table "
                  "draped in a soft white towel receiving a gentle oil back massage, rose petals, "
                  "warm glow, wide cinematic establishing shot", 1600, 1000),
  ("band-soins",  "close-up of skilled hands performing a warm oil massage on a relaxed shoulder, "
                  "glistening skin, candle bokeh, wide cinematic composition", 1600, 1000),
  ("band-vip",    "a luxurious private candlelit spa suite with a steaming jacuzzi, rose petals on "
                  "the water, orchids, plush towels, gold lantern light, wide cinematic", 1600, 1000),
  ("card-massage","a woman receiving a relaxing back massage draped in white towel, warm candlelight, "
                  "rose petals, vertical composition", 900, 1125),
  ("card-hammam", "interior of a luxurious Moroccan hammam, golden steam and mist, brass lantern light, "
                  "ornate dark tadelakt walls, water droplets, vertical composition", 900, 1125),
  ("card-forfaits","an elegant spa still life, lit candles, white orchid, smooth stones, folded towels, "
                  "warm golden ambient light, vertical composition", 900, 1125),
  ("ambiance",    "elegant dark Asian spa interior detail, lotus flower floating in a stone bowl, "
                  "candles, soft warm light, serene minimal still life", 1200, 900),
]

def gen(name, subj, w, h):
    body = json.dumps({"prompt": subj + ", " + STYLE,
        "image_size": {"width": w, "height": h},
        "num_inference_steps": 32, "guidance_scale": 3.5,
        "num_images": 1, "enable_safety_checker": False}).encode()
    req = urllib.request.Request("https://fal.run/fal-ai/flux/dev", data=body, method="POST",
        headers={"Authorization": "Key " + FAL, "Content-Type": "application/json"})
    d = json.load(urllib.request.urlopen(req, timeout=180))
    dest = os.path.join(OUT, name + ".jpg")
    urllib.request.urlretrieve(d["images"][0]["url"], dest)
    print("OK", name, os.path.getsize(dest))

for j in JOBS:
    try: gen(*j)
    except Exception as e: print("FAIL", j[0], e)
print("done")
