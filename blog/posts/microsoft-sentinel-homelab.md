---
title: My First Experience With Microsoft Sentinel
date: 2026-03-29
---

## The Idea

I wanted to get hands-on experience with a real SIEM tool, so I decided to go with Microsoft Sentinel and build a Honeypot homelab. The goal was simple, expose a virtual machine to the internet, and wait for attackers to come, and then monitor and analyze the traffic.

## Setting Up The Lab

I deployed two virtual machines in Azure under a resource group called Nikolov_Lab - one running Windows and one running Linux. Both were placed in North Europe and configured with public IP addresses.

To attract attackers, I added an inbound security rule allowing all traffic on all ports. This essentially opened the machines to the internet.

## What Happened Next

It didn't take long. Within hours, brute force attempts started coming in. Microsoft Sentinel automatically detected and flagged the activity, creating an incident titled "CUSTOM: Brute Force ATTEMPT - Linux Syslog" - rated Medium severity.

The incident showed 6 out of 7 alerts active, with the first activity recorded at 9:06 AM and the last at 11:46 AM on March 27, 2026. The attack came from IP address 14.225.18.22.

## Investigating With KQL

I used KQL queries in Microsoft Sentinel to dig deeper into the logs. One query tracked brute force attempts by attacker IP over the last 24 hours — the results showed IP 14.225.18.22 made 127 attempts and IP 45.148.10.151 made 58 attempts against linux-vm1.

On the Windows machine, Event Viewer showed login failures for a user named "MARTIN" coming from IP 135.116.65.22 - a clear sign of a brute force attack against the Windows VM as well.

## What I Learned

- How to deploy and configure VMs in Azure
- How to connect log sources to Microsoft Sentinel
- How to write basic KQL queries to investigate incidents
- How real attackers behave when a machine is exposed to the internet
- The importance of Network Security Groups and proper inbound rules

This was one of the most practical learning experiences I've had - seeing real attack data in a real SIEM tool.

Thank you for reading, you a real one.