## 3D Art Gallery Tutorial using Three.js

I made this live coding tutorial about "how to create an interactive 3D Art Gallery using Three.js". This project is perfect for artists or designers to exhibit their artwork portfolios or projects. The full tutorial is almost 8 hours long, and is divided into parts. Please consider subscribing to my YouTube channel if you are interested.

## UPDATE!
Dear followers and enthusiasts,

I've been made aware of an issue many of you faced regarding the floor and ceiling textures appearing black. After a thorough investigation, I've identified the root of the problem. The high-resolution 4K textures we recently introduced are relatively large files. To manage such large files, GitHub uses a system called Large File Storage (LFS). However, there's a storage quota associated with LFS, and it seems we've reached that limit. This led to the textures not being stored correctly, resulting in broken image links in the downloaded projects.

The solution at the moment:  
Download the 4K textures and the 3D models yourself and add them in your project woth the correct path.

The Office Ceiling material in 4K: 
https://ambientcg.com/view?id=OfficeCeiling005

The Wood Floor in 4K:
https://ambientcg.com/view?id=WoodFloor040

The Walls in 4K:
https://polyhaven.com/a/leather_white

3D Model Statue:
https://sketchfab.com/3d-models/100kz11-aphrodite-kallipygos-statuette-c01ba617ec83491195146583b70e3df9

## Installation

You need Node.js installed on your computer.
And VSCode as an Editor.
Download link:

- https://nodejs.org
- https://code.visualstudio.com/Download

After cloning, or downloading the zip file, on GitHub (green button `<> Code`) open your terminal, and run:

```bash
  npm install
```

to install all the dependencies.
"node_modules" folder will appear at the left in the Explorer files in VsCode.

Then run:

```bash
  npx vite
```

to run the local server.
You'll see the URL address and the info help. Like for example:

```bash
  VITE v4.3.1  ready in 1759 ms

  ➜  Local:   http://123.4.5.6:7890/
  ➜  Network: use --host to expose  ➜  press h to show help
```

Click the URL and see your project live :)


![App Screenshot](https://res.cloudinary.com/dqiyjy9ye/image/upload/v1693179107/Games/art-gallery-min_aa3ghf.png)

![App Screenshot](https://res.cloudinary.com/dqiyjy9ye/image/upload/v1690132828/Games/Screenshot_2023-07-23_at_7.20.10_PM_zobfoa.png)

## YouTube Video

[Click here!](https://youtu.be/vfMizAmPprs)


## Authors

- [Emilian Kasemi](https://www.github.com/theringsofsaturn)
