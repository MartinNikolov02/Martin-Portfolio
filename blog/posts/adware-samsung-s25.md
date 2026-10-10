---
title: Adware on a Samsung Galaxy S25
date: 2026-10-10
---

## What Happened

My neighbour rushed in panicking, she had downloaded a mobile game she saw advertised on Instagram, and shortly after her phone became completely unusable. Full-screen ads were appearing every 10-15 seconds, covering everything whether she was in an app, playing the game, or just sitting on the home screen with nothing open. The moment one ad finished, she had maybe 1-2 seconds before the next one started. It was impossible to navigate the phone at all.

## Detection

The ads had clear red flags: urgent scare wording, a fake "clean" button, and a small "AD" label in the corner. This is a classic scareware tactic, aggressive adware using fake system warnings designed to pressure the user into tapping "clean" or installing a junk cleaner app.

## Containment

The first thing I did was turn on Airplane mode. The ads stopped immediately, because they load from the network, cutting the connection cut the ads. This gave us time to work safely without the constant interruptions.

## Investigation

Uninstalling the game didn't fix it, the ads continued. A Google Play Protect scan found nothing, which is common because aggressive adware often isn't classified as malware. To identify the real culprit, I enabled Developer options and USB debugging on the phone, connected it to my PC, and used ADB (Android Debug Bridge) to list all third-party installed packages:

adb shell pm list packages -3


One package stood out immediately: **com.grimeaway.ohmyclear** a name consistent with a fake "cleaner" app bundled with the game.

## Eradication

I disabled the package first to confirm it was the cause:

adb shell pm disable-user com.grimeaway.ohmyclear


The ads stopped. Cause confirmed. Then I removed it completely:

adb shell pm uninstall --user 0 com.grimeaway.ohmyclear


Problem solved.

## Recovery and Hardening

After removal I turned USB debugging back off, re-enabled Samsung Auto Blocker, kept Play Protect on, and reviewed the "Display over other apps" permission, which is exactly what the adware was abusing to cover the entire screen. As a precaution, I also recommended changing important passwords, doesn't hurt to be safer.

## Lessons Learned

- **Airplane mode** is a fast, effective containment step for ad-based threats- use it first.
- **Antivirus scans can miss adware**- Play Protect found nothing. Manual investigation matters.
- The **"Display over other apps" permission** is what allows adware to cover your entire screen.
- **Games from Instagram ads** are a common delivery method for this type of software.
- Always **confirm the cause** before removing- disabling the package and watching whether the ads stop is good incident response practice.

My neighbour was scared she couldn't save her phone. I was just excited to bump into this kind of problem in real life and not just in a simulation.

## Scareware on the phone

![Scareware warning ad on the phone screen](../assets/img/adware.jpg)