def round_to_two(num):
    """ This returns a float with two decimal places 
    """

    a = num
    b = int(a)

    c = a - b
    c=c*100
    d = int(c)

    if c- d >= .5:
        c += 1 

    d =d/100

    res = b+d 
    print(res)

    return (res)


round_to_two(3.14159)