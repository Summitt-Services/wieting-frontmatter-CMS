---
title: Network
draft: false
author: Mackenzie McFate
date: 2022-01-30T09:35:01-05:00
socialshare: false
weight: 80
---
<!--
menu:
  main:
    identifier: prices
    pre: dollar-sign
    weight: 200
-->

<hr/>

## Networks and Other Connections

The Wieting's systems are identified as follows:

{{<table "table table-striped table-bordered">}}
| System Name | Description | Addressing | Physical Locations |
| --- | --- | ---- | --- |
| THEATRE | This is the SSID of the Wieting's internet connection and house network. | 10.0.0.0 / 24 | Provides service to OPERATIONS and WEITING-WIFI/GUEST only. |
| OPERATIONS | Cinema system network for systems control. | 10.11.128.0 / 24 | Ethernet only in the Projection Booth.  IP addresses must be manually assigned. |
| WEITING-WIFI | Wireless only via our EERO devices. | 192.168.4.x / 24 | Wireless in the auditorium and south addition. |
| WEITING-GUEST | Guest wireless only via our EERO devices. | 192.168.4.x / 24 | Wireless in the auditorium and south addition. |
| Others | All other names indicate connection types of limited length like `USB`, `HDMI`, `SERIAL`, etc. | Not applicable | Wherever the connected devices are. |
{{< /table >}}            

<!-- Notes from Andrew Peevler...

10.0.0.x = MEDIA Network
10.11.128.x = OPERATIONS network... everything cinema-related except MEDIA

Problem:  When the iMac's ethernet connection is active, the iMac cannot access the internet!

-->

## Diagram

{{< imgfig "/img/_Wieting-Networks-Topology-2022.png" >}}


## Wieting Network Topology "Secret Decoder Ring"

{{<table "table table-striped table-bordered">}}
| Device Code | Description | Physical Location |
| --- | --- | --- |
| A | Wieting-Booth iMac | Projection Booth - Projection Desk |
| B | Samsung Blu-Ray Player | Projection Booth - Projection Desk |
| C | GDC Enterprise Storage Plus 4 TB Content Store | Projection Booth - Projector Pedastal |
| D | QSC DPM 100 Audio Processor | Projection Booth - Audio Rack |
| E | Eero Wireless Mesh Gateway | Light Board Desk w/ 2 Satelite Units in the Annex |
| F | Simplex Grinnell Fire Alarm | Stage North |
| G | Netgear 16-Port Gigabit Switch | Projection Booth - Wall between Pedestal and Audio Rack |
| H | Raspberry Pi Pre-Show Computer | Projection Booth - Cinema Pedestal |
| I | GDC SR-1000 Standalone IMB (Integrated Media Block) | Projection Booth - Projection Desk |
| J | 2-Port HDMI Output Switch | Projection Booth - Projection Desk |
| ~K~ | ~Open USB Drive Boot~ | ~Projection Booth - Cinema Pedastal~ |
| M | QNAP Deluxe Film Vault | Projection Booth - Cinema Pedastal |
| O | Wieting-BoxOffice Windows Desktop Computer | Box Office - North Desk |
| P | Christie CP2210 Cinema Projector | Projection Booth - Cinema Pedestal |
| Q | HI/VI (Hearing-Impaired / Vision-Impaired) Panel | Outside Projection Booth |
| R | ZyXEL VMG4927-B50A DSL Modem + Router + Wireless | Projection Booth - Top of Audio Rack |
| S | NetGear ProSafe 8-Port Gigabit Switch | Projection Booth - Rear of Cinema Pedestal |
| W | Two Individual Ethernet Terminations | Stage - North and South Wings |
| X | Booth-Windows - Windows 10 Desktop | Projection Booth - Projection Desk |
{{< /table >}}            

### Cable Label Convention

Each end of a cable should be labeled following this convention:

  `DeviceCode.Port - Network or Cable Type - DeviceCode.Port`

Labels should be applied such that the `DeviceCode.Port` corresponding to a particular device is nearest that device.  This will require placing one of the labels "upside down". \*See the first example below for clarification.  

#### Examples

  - A `THEATRE` network cable running from device `R`, port 1, to an unidentified port on device `F` will have a pair of labels marked `R.1 - THEATRE - F.x`.  \*For example, at device `R` the `R.1` end of the label should be nearest device `R`, while at device `F` the `F.x` end of that label should be nearest device `F`.
  - A `USB` cable running from an unidentified port on device `L` to an `In` port on device `X` will carry a pair of lables marked `L.x - USB - X.In`.
  - An `HDMI-to-DVI` cable running from the `Out` port on device `H` to a `DVI` port on device `P` will be labeled `H.Out - HDMI-to-DVI - P.DVI`.

  # Mac NFS Connection

  As long as the Mac Mini and Projector/IMB IP addresses are as shown above, the Mac can act as an NFS server from which to ingest content (mostly keys) for projection.  The Mac's NFS configuration steps were taken from [https://apple.stackexchange.com/questions/476892/new-mac-unable-to-get-nfs-to-work-what-am-i-missing](https://apple.stackexchange.com/questions/476892/new-mac-unable-to-get-nfs-to-work-what-am-i-missing).  

  The Mac serves its `/Users/toledowieting/Downloads` directory mapped to the projection system as `Booth Mac Mini NFS`.  On the [IMB web interface](https://10.11.111.128) go to `Content` | `Source` | `Ingest` to initiate a connection and ingest transfer from the Mac to the projection system.  
