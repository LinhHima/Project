

import turtle
import random
import time
import math
import time
from tkinter import *

    

# Khởi tạo board rỗng, truyền kích thước size bất kì vào
def make_empty_board(sz):
    board = []
    for i in range(sz):
        board.append([" "]*(sz)) #tạo board = mảng 2 chiều
    return board
# Kiểm tra xem board có rỗng ko ?
def is_empty(board):
    return board == [[' ']*len(board)]*len(board) # tất cả phần tử trong board đều là rỗng
# Kiểm tra xem toạ độ đánh vẫn còn trong board ko ?
def is_in(board, y, x):
    return 0 <= y < len(board)-1 and 0 <= x < len(board)-1 #giới hạn tọa độ cho phép khi click
# 
def getConsecutiveScore(count ,blocks,curTurn):
    winGuard=1000000
    #bị chặn 2 đầu và mà không phải 5 viên liên tiếp bị chặn 2 đầu=> ko đi đc nữa
    if blocks ==2 and count <5:
        return 0 # không đi đc nữa nên 0 điểm về chỗ
    if count == 5 :
        return winScore # 5 ô liên tục là thắng rồi dia dia
    elif count == 4: # 4 ô liên tục + ko bị chặn ở cả 2 đầu
        if curTurn:  
            return winGuard # lượt mình đặt nốt ô còn lại là xong=> win cmnl
        else:
            if blocks==0:  #ko bị chặn ở đầu nào
                return winGuard/4 # đợi nó đánh xong đánh nốt phát là win=>cho điểm cao
            else:
                return 200
    elif count ==3: #3 ô liên tục
        if blocks==0: # cả 2 đầu ko bị chặn
            if curTurn: 
                return 50000 #lượt mình đánh thành 4 mà 2 đầu ko bị chặn=>win lun 
            else:
                return 200
        #Mấy phần phía dưới hình dung và hiểu tương tự
        else:
            if curTurn:
                return 10
            else :
                return 5
    elif count==2:
        if blocks==0:
            if curTurn:
                return 7
            else:
                return 5
        else :
            return 3
    elif count==1:
            return 1
    else: #Không trường hợp nào tức là đã > mịa 5 con liên tục=> win hehehe
        return winScore*2

#đánh giá điểm theo chiều ngang
def score_x(board_tmp,is_black,player_turns):
    #khởi tạo các biến
    consecutive =0
    blocks=2
    score=0
    #duyệt từng row một
    for x in range(game_size):
        #duyệt từng ô trên row
        for y in range(game_size):
            if board_tmp[x][y] == ('b' if is_black else 'w'): # nếu là black thì mỗi lần thấy black thì consecutive+=1
                consecutive+=1
            elif board_tmp[x][y] == ' ':#gặp ô trống 
                if consecutive>0: #trước đó đã có 1 lượng cờ liên tiếp
                    blocks-=1 #=> ô trống nên ko bị chặn=>blocks-=1
                    score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)#cộng điểm???
                    consecutive=0
                    blocks=1
                else:
                    blocks =1 #gặp ô trống mà chưa có con nào thì set về 1 
            elif consecutive>0: #gặp ô đối thủ
                score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)
                consecutive=0
                blocks=2
            else:
                blocks=2
        if consecutive>0:
            score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)
        consecutive=0
        blocks=2
    return score
def score_y(board_tmp,is_black,player_turns):#score theo chiều dọc
    consecutive =0
    blocks=2
    score=0
    for x in range(game_size):
        for y in range(game_size):
            if board_tmp[y][x] == ('b' if is_black else 'w'):
                consecutive+=1
            elif board_tmp[y][x] == ' ':
                if consecutive>0:
                    blocks-=1
                    score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)
                    consecutive=0
                    blocks=1
                else:
                    blocks =1
            elif consecutive>0:
                score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)
                consecutive=0
                blocks=2
            else:
                blocks=2
        if consecutive>0:
            score+=getConsecutiveScore(consecutive,blocks,is_black==player_turns)
            consecutive=0
            blocks=2
    return score
def score_d(board_tmp,is_black,player_turns):# score theo đường chéo
    consecutive=0
    blocks=2
    score=0
    for k in range(2*game_size-1):
        iStart= max(0,k-game_size+1)
        iEnd=min(game_size-1,k)
        for i in range (iStart,iEnd+1):
            j = k - i
            if board_tmp[i][j]== ('b' if is_black else 'w'):
                consecutive+=1
            elif board_tmp[i][j]==' ':
                if consecutive>0:
                    blocks-=1
                    score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
                    consecutive=0
                    blocks=1
                else:
                    blocks=1
            elif consecutive>0:
                score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
                consecutive=0
                blocks=2
            else:
                blocks=2
        if consecutive>0:
            score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
        consecutive=0
        blocks=2
    for k in range(1-game_size,game_size):
        iStart= max(0,k)
        iEnd=min(game_size+k-1,game_size-1)
        for i in range (iStart,iEnd+1):
            j = i-k
            if board_tmp[i][j]== ('b' if is_black else 'w'):
                consecutive+=1
            elif board_tmp[i][j]==' ':
                if consecutive>0:
                    blocks-=1
                    score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
                    consecutive=0
                    blocks=1
                else:
                    blocks=1
            elif consecutive>0:
                score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
                consecutive=0
                blocks=2
            else:
                blocks=2
        if consecutive>0:
            score+=getConsecutiveScore(consecutive,blocks,is_black == player_turns)
        consecutive=0
        blocks=2
    return score
def get_score(board_tmp,is_black,player_turn): # tính tổng score đạt đc 
    return score_x(board_tmp,is_black,player_turn)+score_y(board_tmp,is_black,player_turn)+score_d(board_tmp,is_black,player_turn)
def evaluateBoardForWhite(board_tmp,blackTurns):
    blackScore=get_score(board_tmp,1,blackTurns)
    whiteScore=get_score(board_tmp,0,blackTurns)
    if blackScore==0:
        blackScore = 1.0
    return whiteScore/blackScore
def generateMove(board_tmp): #tạo tất cả các move có thể đi
    moveList=[]
    for i in range(game_size):
        for j in range(game_size):
            if board_tmp[i][j]!=' ':
                continue
            if i>0:
                if j>0:
                    if board_tmp[i-1][j-1]!=' ' or board_tmp[i][j-1]!=' ':
                        moveList.append([i,j])
                        continue
                if j<game_size-1:
                    if board_tmp[i-1][j+1]!= ' ' or board_tmp[i][j+1] !=' ':
                        moveList.append([i,j])
                        continue
                if  board_tmp[i-1][j] != ' ':
                        moveList.append([i,j])
                        continue
            if i < game_size -1:
                if j>0:
                    if board_tmp[i+1][j-1]!=' ' or board_tmp[i][j-1]!=' ':
                        moveList.append([i,j])
                        continue
                if j< game_size -1:
                    if board_tmp[i+1][j+1] !=' ' or board_tmp[i][j+1]!=' ':
                        moveList.append([i,j])
                        continue
                if board_tmp[i+1][j]!=' ':
                    moveList.append([i,j])
                    continue
    return moveList
def minimaxAB(depth,board_tmp,isMax,alpha,beta): #minmax alg
    if depth==0:
        return [evaluateBoardForWhite(board_tmp,not isMax),None,None]
    allPossibleMoves=generateMove(board_tmp)
    if len(allPossibleMoves) ==0 :
        return [evaluateBoardForWhite(board_tmp,not isMax),None,None]
    bestMove=[None]*3
    if isMax:
        bestMove[0]=-1
        for move in allPossibleMoves:
            dummyBoard=[row[:] for row in board_tmp]
            dummyBoard[move[0]][move[1]]='w'
            tempMove=minimaxAB(depth-1,dummyBoard,not isMax,alpha,beta)
            if tempMove[0]>alpha:
                alpha =tempMove[0]
            if tempMove[0]>=beta:
                return tempMove
            if tempMove[0]> bestMove[0]:
                bestMove=tempMove
                bestMove[1]=move[0]
                bestMove[2]=move[1]
    else:
        bestMove[0]=100000000
        bestMove[1]=allPossibleMoves[0][0]
        bestMove[2]=allPossibleMoves[0][1]
        for move in allPossibleMoves:
            dummyBoard=[row[:] for row in board_tmp]
            dummyBoard[move[0]][move[1]]='b'
            tempMove=minimaxAB(depth-1,dummyBoard, not isMax,alpha,beta)
            if tempMove[0]<beta:
                beta=tempMove[0]
            if tempMove[0]<=alpha:
                return tempMove
            if tempMove[0]<bestMove[0]:
                bestMove=tempMove
                bestMove[1]=move[0]
                bestMove[2]=move[1]
    return bestMove
def searchingWinningMove(board_tmp): # tìm trước xem nước nào thắng luôn đc ko
    allPossibleMoves=generateMove(board_tmp)
    winningMove=[None]*3
    for move in allPossibleMoves:
        dummyboard=[row[:] for row in board_tmp]
        dummyboard[move[0]][move[1]]='w'
        if(get_score(dummyboard,False,False))>=winScore:
            winningMove[1]=move[0]
            winningMove[2]=move[1]
            return winningMove
    return None
##Graphics Engine
def caculateNextMove(depth):#AI tính toán nước đi tiếp theo
    move=[None]*2
    bestMove=searchingWinningMove(board)
    if bestMove !=None:
        move[0]=bestMove[1]
        move[1]=bestMove[2]
    else:
        bestMove=minimaxAB(depth,board,True,-1,100000000)
        if bestMove[0] == None:
            move=None
        else:
            move[0]=bestMove[1]
            move[1]=bestMove[2]
    return move
        


def checkWinner(): #check winner
    if(get_score(board,True,False)>=winScore) :
        return 2
    if(get_score(board,False,True)>=winScore) :
        return 1
    return 0
def submit():
        global board,win,root_end,playerTurn
        board=make_empty_board(game_size+1)
        win=False
        colors['b'].clear()
        colors['w'].clear()
        if who_first.get()==1 and mode.get()==1:
            draw_stone(int(game_size/2),int(game_size/2),colors['w'])
            board[int(game_size/2)][int(game_size/2)]='w'
            move_history.append((int(game_size/2), int(game_size/2)))
        root_end.destroy()
        if mode.get()==3:
             playerTurn=1
             draw_stone(int(game_size/2),int(game_size/2),colors['w'])
             board[int(game_size/2)][int(game_size/2)]='w'
             move_history.append((int(game_size/2), int(game_size/2)))
             playerTurn=not playerTurn
             while(1):
                if difficulty.get()!=3:
                    time.sleep(0.2)
                AI_vs_AI()
                if win==True:
                    break
             endGame(checkWinner())
            
def endGame(winner):
        global root_end
        root_end=Tk()
        root_end.eval('tk::PlaceWindow . center')
        root_end.geometry("250x120")
        text=''
        root_end.title('Game Over')
        if winner==1:
            text='White won'
        elif winner==2:
            text='Black won'
        elif winner==0:
            text='Draw'
        Label(root_end,text=text,pady=30).pack(anchor=CENTER)
        Button(root_end,text="Try again",command=submit).pack(anchor=CENTER)
        root_end.mainloop()
def click(x,y): #mỗi click thì AI sẽ tính toán xem sẽ chọn nước đi nào
    global board,colors, move_history,win,playerTurn,endGame
   
    if win!=True:
        x=math.floor(x)
        y=math.floor(y)


    else:          
        x=-1
        y=-1
    if x == -1 and y == -1 and len(move_history) != 0:
        x, y = move_history[-1]
     
        del(move_history[-1])
        board[y][x] = ' '
        x, y = move_history[-1]
       
        del(move_history[-1])
        board[y][x] = ' '
        return
    
    if not is_in(board, y, x):
        return
    
    if mode.get()==1:
        if board[y][x] == ' ':
            draw_stone(x,y,colors['b'])
            board[y][x]='b'
            move_history.append((x, y))
            if checkWinner()!=0:
                win = True
                endGame(checkWinner())
                return
            ay,ax=caculateNextMove(difficulty.get())
            draw_stone(ax,ay,colors['w'])
            board[ay][ax]='w'
            if checkWinner()!=0:
                win = True
                endGame(checkWinner())
                return       
            move_history.append((ax, ay))
    if mode.get()==2:
        if board[y][x] == ' ' and playerTurn==False:
            draw_stone(x,y,colors['w'])
            board[y][x]='w'
            move_history.append((x, y))
            playerTurn=not playerTurn
            if checkWinner()!=0:
                win = True
                endGame(checkWinner())
                return
        elif board[y][x] == ' ' and playerTurn==True:
            draw_stone(x,y,colors['b'])
            board[y][x]='b'
            move_history.append((x, y))
            playerTurn=not playerTurn

            if checkWinner()!=0:
                win = True
                endGame(checkWinner())
                return
def AI_vs_AI():
    global playerTurn,win
    ay,ax=caculateNextMove(difficulty.get())

    if ay==None:
        win=True
        return 1
    else:
        if playerTurn==1:
            draw_stone(ax,ay,colors['w'])
            board[ay][ax]='w'
        elif playerTurn ==0:
            draw_stone(ax,ay,colors['b'])
            board[ay][ax]='b'
        if checkWinner()!=0:
            win = True
            return 1      
        move_history.append((ax, ay))
        playerTurn=not playerTurn
        return 0
        
def initialize(size):
    global board,screen,colors, move_history,game_size,winScore,playerTurn,win
    winScore=100000000
    win=FALSE
    game_size=size-1
    move_history = []
    playerTurn=1
    board = make_empty_board(size)
    screen = turtle.Screen()
    screen.onclick(click)
    screen.setup(screen.screensize()[1]*2,screen.screensize()[1]*2)
    screen.setworldcoordinates(-1,size,size,-1)
    screen.bgcolor('orange')
    screen.tracer(100)
    colors = {'w':turtle.Turtle(),'b':turtle.Turtle(), 'g':turtle.Turtle()}
    colors['w'].color('white')
    colors['b'].color('black')
    for key in colors:
        colors[key].ht()
        colors[key].penup()
        colors[key].speed(0)
    border = turtle.Turtle()
    border.hideturtle()
    border.speed(9)
    border.penup()
    side = (size-1)/2
    i=-1
    for start in range(size):
        border.goto(start,side + side *i)    
        border.pendown()
        i*=-1
        border.goto(start,side + side *i)     
        border.penup()
    i=1
    for start in range(size):
        border.goto(side + side *i,start)
        border.pendown()
        i *= -1
        border.goto(side + side *i,start)
        border.penup()
    border.ht()
    if who_first.get()==1 and mode.get()==1:
        draw_stone(int(game_size/2),int(game_size/2),colors['w'])
        board[int(game_size/2)][int(game_size/2)]='w'
        move_history.append((int(game_size/2), int(game_size/2)))
    if mode.get()==3:
        draw_stone(int(game_size/2),int(game_size/2),colors['w'])
        board[int(game_size/2)][int(game_size/2)]='w'
        move_history.append((int(game_size/2), int(game_size/2)))
        playerTurn=not playerTurn
        while(1):
            time.sleep(0.2)
            AI_vs_AI()
            if win==True:
                break
        endGame(checkWinner())
    screen.tracer(False)
    screen.listen()
    screen.mainloop()
def draw_stone(x,y,colturtle):
    if x==None:
        return
    colturtle.goto(x+0.5,y+0.2)
    colturtle.pendown()
    colturtle.begin_fill()
    colturtle.circle(0.3)
    colturtle.end_fill()
    colturtle.penup()
    turtle.update()
def config():
    global root,difficulty,mode,who_first,e1
    def submit():
        size = int (e1.get())
        root.destroy()
        initialize(size+1)
    root = Tk()
    root.geometry("500x150")
    root.eval('tk::PlaceWindow . center')
    root.title('Select choice')
    difficulty = IntVar()
    difficulty.set(1)
    Label(root,text="Choose difficulty:",padx=10).pack(anchor=W)
    Radiobutton(root,text='Easy' ,variable=difficulty,value=1).place(x=150,y=0)
    Radiobutton(root,text="Medium",variable=difficulty, value=2).place(x=250,y=0)
    Radiobutton(root,text="Hard",variable=difficulty,value=3).place(x=350,y=0)
    mode = IntVar()
    mode.set(1)
    Label(root,text="Choose mode:",padx=10).pack(anchor=W)
    Radiobutton(root,text='AI vs Human' ,variable=mode,value=1).place(x=150,y=20)
    Radiobutton(root,text="Human vs Human",variable=mode, value=2).place(x=250,y=20)
    Radiobutton(root,text="AI vs AI",variable=mode,value=3).place(x=380,y=20)
    who_first = IntVar()
    who_first.set(1)
    Label(root,text="Who first:",padx=10).pack(anchor=W)
    Radiobutton(root,text='AI' ,variable=who_first,value=1).place(x=150,y=40)
    Radiobutton(root,text="Human",variable=who_first, value=2).place(x=250,y=40)
    Label(root,text="Choose size",padx=10).pack(anchor=W)
    e1=Entry(root)
    e1.place(x=90,y=65)
    Button(root,text="Start game",command=submit).place(x=200,y=120)
    root.mainloop()
if __name__ == '__main__':
    config()