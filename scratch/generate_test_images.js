import fs from 'fs';
import path from 'path';

function create_test_png(filename, color) {
    let data;
    if (color === 'blue') {
        data = Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010802000000907753de0000000c49444154789c636060fcff3f0005000102aad5dd030000000049454e44ae426082', 'hex');
    } else {
        data = Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010802000000907753de0000000c49444154789cfccfc000000301010018dd8db00000000049454e44ae426082', 'hex');
    }
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, data);
}

create_test_png('c:/newproject/scratch/image1.png', 'blue');
create_test_png('c:/newproject/scratch/image2.png', 'red');
console.log("Test images generated.");
