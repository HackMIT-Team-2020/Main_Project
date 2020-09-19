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
