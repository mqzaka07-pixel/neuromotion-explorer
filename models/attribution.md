# Sumber model anatomi 3D

File `skeleton.bin`, `organs.bin`, `brain.bin`, dan `muscles.bin` berisi bentuk tulang, organ, otak, dan otot dari:

**BodyParts3D**, Copyright © 2008 Life Science Integrated Database Center (DBCLS), dilisensikan dengan
[Creative Commons Attribution-Share Alike 2.1 Japan (CC BY-SA 2.1 JP)](https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en).
Sumber: https://lifesciencedb.jp/bp3d/ (melalui salinan di https://github.com/Kevin-Mattheus-Moerman/BodyParts3D).

Perubahan: jumlah segitiga mesh disederhanakan, sumbu koordinat diubah (Y ke atas, satuan 10 cm), dan semua bagian dikemas dalam format biner sederhana
(header `BP3D`, panjang JSON, JSON daftar bagian, lalu posisi uint16 terkuantisasi + indeks segitiga). File turunan ini juga berlisensi CC BY-SA 2.1 JP.
