import time

scores = []  # scores of review
times = []  # times of reviews


def findnextreview(scores, times):
    whenreview = 0  # unix epoch time of when the next review is to be conducted
    if len(times) == 0:
        whenreview = time.time()
    elif len(times) == 1 or len(times) == 2:
        whenreview = times[-1] + 86400
    elif len(times) == 3:
        whenreview = times[-1] + 2 * 86400
    elif len(times) > 3:
        whenreview = times[-1] + (times[-2] - times[0]) + (scores[-1] - 3) * 86400
    return whenreview

if __name__ == '__main__':
    print(findnextreview(scores, times))

# timelapsed = cur_time - times[-1]
# scorefactor = scores[-1] - 3
# print(timelapsed)
# gap = times[-2] - times[0] + scorefactor*86400
# print(gap)
# timeremaining = gap - timelapsed #seconds remaining
# print(timeremaining)


# import math
# rating = 4.0 #difficulty of problem on scale of 1 to 5
# print(str(cur_time - 1599897829))
# n = 2 #number of reviews done
# scores = [2,3] #scores on a scale of 1 to 5
# avg = 0.0
# knowledge = 0
# if n > 4:
#     for i in range(1,6):
#         avg += scores[-i]
#     avg /= 5.0
# elif n == 0:
#     avg = 0
# else:
#     for i in range(n):
#         avg += scores[i]
#     avg /= n
# knowledge = avg
# tsr /= 86400.0
# P = (math.e)**((-1*rating*tsr)/knowledge)
# print(knowledge, rating, tsr, math.e)
# print(P)
# P[recall] = e^(−θ · d/s)
# where θ ∈ R+is the item diﬃculty,
# d ∈ R+is the time elapsed since previous review,
# and s ∈ R+is the memory strength(which can be modeled on how many repetitions have already been done)
