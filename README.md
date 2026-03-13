<div align="center">

# L U M I N A — GL
### 001 // ADVANCED OPTICAL SHADERS & INTERACTIVE REFRACTION

[![WebGL](https://img.shields.io/badge/WebGL-Shaders-FF3366?style=for-the-badge&logo=opengl)]()
[![React-Three-Fiber](https://img.shields.io/badge/R3F-Engine-000?style=for-the-badge&logo=react)]()
[![GPU](https://img.shields.io/badge/GPU-Accelerated-white?style=for-the-badge)]()

**A curated laboratory of high-end image distortion techniques, exploring the boundaries of Chromatic Aberration, Fluid Dynamics, and Kinetic Momentum.**

[ [LAUNCH GALLERY](https://lumina-gl.sujitkoji.com/) ] &nbsp; • &nbsp; [ [SOURCE CODE](https://github.com/sujitkoji/lumina-gl) ]

<br/>

![Header](https://github.com/sujitkoji/lumina-gl/blob/main/public/lumina-gl.png?raw=true)

---

### / THE CONCEPT

**LUMINS GL** is a technical study in **Creative Engineering**. Unlike standard galleries, this project focuses on the "Physicality of Light"—simulating how glass, speed, and fluid medium distort digital imagery in real-time.

By offloading complex pixel-sorting and RGB shifting to custom **GLSL Fragment Shaders**, we achieve cinematic 60FPS interactions that react to user intent and velocity.

---

### / LIVE EXPERIMENTS

<table width="100%" style="border-collapse: collapse; text-align: center;">
  <tr style="background: #0a0a0a;">
    <th style="border: 1px solid #1a1a1a; padding: 15px;">MODULE</th>
    <th style="border: 1px solid #1a1a1a; padding: 15px;">TECHNICAL FOCUS</th>
    <th style="border: 1px solid #1a1a1a; padding: 15px;">DIRECT LINK</th>
  </tr>

    
   <tr>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <b>EXP 01 // Liquid Art Wave</b>
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px; color: #888;">
      Fluid Dynamics & Refractive Shaders.
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <a href="https://lumina-gl.sujitkoji.com/lab/liquid-art-wave"><b>[ VIEW DEMO ]</b></a>
    </td>
  </tr>

  <tr>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <b>EXP 02 // RGB Displacement</b>
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px; color: #888;">
      Velocity-based RGB ghosting & procedural noise.
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <a href="https://lumina-gl.sujitkoji.com/lab/rgb-displacement"><b>[ VIEW DEMO ]</b></a>
    </td>
  </tr>
  
     
   <tr>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <b>EXP 03 // Spectral Echo</b>
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px; color: #888;">
      A chromatic wave distortion creating a ghostly interactive trail.
    </td>
    <td style="border: 1px solid #1a1a1a; padding: 20px;">
      <a href="https://lumina-gl.sujitkoji.com/lab/spectral-echo"><b>[ VIEW DEMO ]</b></a>
    </td>
  </tr>
   
</table>

---

### / TECHNICAL DEEP DIVE

#### // KINETIC MOMENTUM
The system calculates the Euclidean distance between mouse coordinates across frames to derive a `uVelocity` uniform. This delta drives the intensity of the color split.

$$\text{Velocity} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

#### // OPTICAL ABERRATION
The distortion is achieved by sampling the texture three times with a progressive offset, simulating the way a physical lens fails to focus all colors to the same point. 



---

### / REPOSITORY ARCHITECTURE

<table align="center" style="border: none;">
<tr>
<td align="left" style="background-color: #050505; border: 1px solid #1a1a1a; border-radius: 8px; padding: 35px;">
<pre style="margin: 0; font-family: 'JetBrains Mono', monospace; line-height: 1.6; color: #666; background: none; border: none;">
<span style="color: #fff;">src/lab/</span>
 ├─ <span style="color: #fff;">RGB-Displacement/</span>
 │  ├─ scene.tsx          <span style="color: #444;">// Refractive Mesh</span>
 │  └─ shaders/           <span style="color: #444;">// Static Refraction GLSL</span>
 │
 ├─ <span style="color: #fff;">Liquid-Art-Wave/</span>
 │  ├─ scene.tsx          <span style="color: #444;">// Velocity Logic</span>
 │  └─ shaders/           <span style="color: #444;">// RGB Shift GLSL</span>
 │
 └─ <span style="color: #fff;">Core/</span>
    └─ Frame.tsx          <span style="color: #444;">// Global Canvas & Post-Processing</span>
</pre>
</td>
</tr>
</table>

---

### / LOGIC FLOW

```mermaid
graph LR
    A[Mouse Interaction] --> B{Velocity Calc}
    B -->|Delta > 0| C[uVelocity Uniform]
    C --> D[Fragment Shader]
    D --> E[RGB Channel Offset]
    E --> F[Chromatic Aberration]
    style A fill:#000,stroke:#fff,stroke-width:1px
    style D fill:#111,stroke:#FF3366,stroke-width:2px

```

### / PERFORMANCE STRATEGY

`LERP SMOOTHING` • `FRUSTUM CULLING` • `GPU POWER PREFERENCE` • `DPR MANAGEMENT`

### / CREDITS

**SUJIT KOJI** Creative Technologist & Shader Architect [ [PORTFOLIO](https://sujitkoji.com/) ] &nbsp; / &nbsp; [ [LINKEDIN](https://www.linkedin.com/in/sujitkoji/) ]


© 2026 // OPEN-SOURCE OPTICAL LAB

</div>
