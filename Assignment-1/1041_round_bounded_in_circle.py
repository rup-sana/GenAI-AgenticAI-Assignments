class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        directions = [(0,1),(1,0),(0,-1),(-1,0)]
        a,b = 0,0
        x = 0
        for i in instructions:
            if i == 'G':
                a += directions[x][0]
                b += directions[x][1]
            elif i == 'L':
                x = (x+3)%4
            elif i == 'R':
                x = (x+1)%4
        return (a == 0 and b == 0) or x != 0