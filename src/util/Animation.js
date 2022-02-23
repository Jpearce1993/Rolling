
// importing all the images needed for the 
// animation and dice types
import d4_1 from '../Images/d4/d4-#1.png';
import d4_2 from '../Images/d4/d4-#2.png';
import d4_3 from '../Images/d4/d4-#3.png';
import d4_main from '../Images/d4/d4-Main.png';

import d6_1 from '../Images/d6/d6-#1.png';
import d6_2 from '../Images/d6/d6-#2.png';
import d6_3 from '../Images/d6/d6-#3.png';
import d6_main from '../Images/d6/d6-Main.png';

import d8_1 from '../Images/d8/d8-#1.png';
import d8_2 from '../Images/d8/d8-#2.png';
import d8_3 from '../Images/d8/d8-#3.png';
import d8_main from '../Images/d8/d8-Main.png';

import d10_1 from '../Images/d10/d10-#1.png';
import d10_2 from '../Images/d10/d10-#2.png';
import d10_3 from '../Images/d10/d10-#3.png';
import d10_main from '../Images/d10/d10-Main.png';

import d12_1 from '../Images/d12/d12-#1.png';
import d12_2 from '../Images/d12/d12-#2.png';
import d12_3 from '../Images/d12/d12-#3.png';
import d12_main from '../Images/d12/d12-Main.png';

import d20_1 from '../Images/d20/d20-#1.png';
import d20_2 from '../Images/d20/d20-#2.png';
import d20_3 from '../Images/d20/d20-#3.png';
import d20_main from '../Images/d20/d20-Main.png';

import d100_1 from '../Images/d100/d100-#1.png';
import d100_2 from '../Images/d100/d100-#2.png';
import d100_3 from '../Images/d100/d100-#3.png';
import d100_main from '../Images/d100/d100-Main.png';

const Animation = {
    buildAnimation(dice,animationName) {
        // initalizing variables for switch
        // statement and keyFrame creation
        let img1;
        let img2;
        let img3;
        let imgMain;

        // switch statement to assign
        // the correct dice images for 
        // the animation based on the
        // dice type
        switch(dice){
            case 'd4':
                img1 = d4_1;
                img2 = d4_2;
                img3 = d4_3;
                imgMain = d4_main;
                break;
            case 'd6':
                img1 = d6_1;
                img2 = d6_2;
                img3 = d6_3;
                imgMain = d6_main;
                break;
            case 'd8':
                img1 = d8_1;
                img2 = d8_2;
                img3 = d8_3;
                imgMain = d8_main;
                break;
            case 'd10':
                img1 = d10_1;
                img2 = d10_2;
                img3 = d10_3;
                imgMain = d10_main;
                break;
            case 'd12':
                img1 = d12_1;
                img2 = d12_2;
                img3 = d12_3;
                imgMain = d12_main;
                break;
            case 'd20':
                img1 = d20_1;
                img2 = d20_2;
                img3 = d20_3;
                imgMain = d20_main;
                break;        
            case 'd100':
                img1 = d100_1;
                img2 = d100_2;
                img3 = d100_3;
                imgMain = d100_main;
                break;
            case 'temp':
                img1 = '../../Images/d20/d20-#1.png';
                img2 = '../../Images/d20/d20-#2.png';
                img3 = '../../Images/d20/d20-#3.png';
                imgMain ='../../Images/d20/d20-Main.png';
                break;
            default:
                break;
        }

        // keyFrame variable declaration and
        // initialization to create the animation
        // used in rolling based off the correct
        // dice values 
        let keyFrames = `
        @keyframes ${animationName} {
            from {
                transform: rotate(0deg);
            }
        
            0% {
                background-image: url(${imgMain});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            10% {
                background-image: url(${img1});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            20% {
                filter: blur(1px);
                background-image: url(${img2});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            30% {
                background-image: url(${img3});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            40% {
                background-image: url(${imgMain});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            50% {
                filter: blur(1px);
                background-image: url(${img1});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            60% {
                filter: blur(1px);
                background-image: url(${img2});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            70% {
                filter: blur(1px);
                background-image: url(${img3});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            80% {
                filter: blur(1px);
                background-image: url(${imgMain});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            90% {
                filter: blur(1px);
                background-image: url(${img1});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            100% {
                background-image: url(${imgMain});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        
            to {
                transform: rotate(359deg);
            }
        }`

        // return the created animation
        return keyFrames;
    }
}

export default Animation;