x ="5.46"
def safe_float(x):

    try:
       float(x)
    except:
        
        print("Error converting")
        return None 

    x = float(x)

    print(x)
    return x

safe_float(x)
