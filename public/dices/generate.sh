magick $(for i in $(seq 1 50); do echo dice_$(shuf -i 1-6 -n 1).png; done) -delay 0.1 -loop 0 -quality 100 dice_roll.webp
