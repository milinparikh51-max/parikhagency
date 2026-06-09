import os

def create_test_png(filename, color):
    # Hex representation of a 1x1 pixel PNG with a specific color
    # Blue:
    if color == 'blue':
        data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\x60\x60\xfc\xff\x3f\x00\x05\x00\x01\x02\xaa\xd5\xdd\x03\x00\x00\x00\x00IEND\xaeB`\x82'
    # Red:
    else:
        data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xfc\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB`\x82'
        
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'wb') as f:
        f.write(data)

create_test_png('c:/newproject/scratch/image1.png', 'blue')
create_test_png('c:/newproject/scratch/image2.png', 'red')
print("Test images generated.")
