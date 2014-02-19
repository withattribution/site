aok-site
========

THE GIFS

mv $(ls | awk '{nr++; if (nr % 4 == 0) print $0}') destdir

cp $(ls | awk '{nr++; if (nr % 4 == 0) print $0}') ~/Desktop/moved_png
  
gifsicle -O3 --colors 128 dart_png.gif > png_opt.gif

mplayer -ss 00:00 -endpos 40 ~/Desktop/slap.mp4 -vo png:z=1:outdir=~/Desktop/2vid -ao null

mplayer -vo jpeg -sstep 5 file.avi

convert -crop '1000x500+176+40' +repage -fuzz 1.6% -delay 8 -loop 0 2vid/*.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif

convert +repage -fuzz 3.0% -delay 4 -loop 0 ~/Desktop/moved/*.jpg -layers OptimizePlus -layers OptimizeTransparency quartered.gif



gifsicle -O3 --colors 256 quartered.gif > dizzle.gif





convert +repage -fuzz 2.0% -delay 4 -loop 0 ~/Desktop/moved/*.jpg -layers OptimizePlus -layers OptimizeTransparency quartered_2.gif
gifsicle -O3 --colors 256 --resize-width 800 quartered_2.gif > dizzle_8.gif
 



making fonts with fontcustom
fontcustom compile ~/Desktop/vectors/ -t css preview scss -f aokfont

then fix the path ../fonts -- dunno how to automate for now

convert +repage -fuzz 2.0% -delay 4 -loop 0 ~/Desktop/moved/*.jpg -layers OptimizePlus -layers OptimizeTransparency quartered_2.gif


 #!/bin/sh

DATESTAMP=`date +%Y-%m-%d`
FILEPRF="/tmp/animgif_${DATESTAMP}_$$"
DIRPRF="/tmp/animgifd_${DATESTAMP}_$$"

# Default values
DEF_START="0:0"
DEF_ALMOST="${FILEPRF}_almost.gif"
DEF_DONE="${FILEPRF}_done.gif"

MP_INVID="${1-test.mov}"
MP_START="${2-$DEF_START}"
MP_DIR="${DIRPRF}_2vid"

mplayer -ss "${MP_START}"  "${MP_INVID}" -vo png:z=1:outdir="${MP_DIR}" -ao null
convert -crop '1000x500+176+40' +repage -fuzz 1.6% -delay 8 -loop 0 "${MP_DIR}"/*.png -layers OptimizePlus -layers OptimizeTransparency "${DEF_ALMOST}"
gifsicle -O3 --colors 256 "${DEF_ALMOST}" > "${DEF_DONE}"

# Now choose
small=$(ls -S1 "${FILEPRF}"*.gif | tail -n1)
infilepref="${MP_INVID%.*}"
cp "${small}" "${infilepref}.gif"
ls -lh "${infilepref}.gif"

# cleanup
rm -r "${MP_DIR}"
rm  "${DEF_ALMOST}" "${DEF_DONE}"


we decided that tumblr will hold only images and video and the hero will be a gif or whatever we want 

this means that the hero will require a mobile version of the gif/video/image and the mobile image sizes of the tumblr images/videos and the rest will be hosted on amazon

hero:

hosted on amazon -> mobile and desktop sized assets

grid:

hosted on tumblr -> mobile and desktop sized images and video
--> use bigvideo to make videos full screen
--> consider making an angular directive 

--> video:
  1: pull in thumbnail display
  2: large thing then play fullscreen the video





















