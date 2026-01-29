import random
import datetime as dt



RNG_SEED = 551
random.seed(RNG_SEED)

STATES = ["CA","NY","TX","FL","IL","WA","MA","PA","GA","NC","VA","AZ","CO","NJ","OH"]
CATEGORIES = ["Electronics","Home","Beauty","Grocery","Sports","Books","Clothing","Toys"]
PAYMENTS = ["card","paypal","apple_pay","google_pay","bank_transfer"]

def _choice_weighted(items, weights):
    # items: list, weights: list of positive numbers
    total = sum(weights)
    r = random.random() * total
    upto = 0.0
    for item, w in zip(items, weights):
        upto += w
        if upto >= r:
            return item
    return items[-1]

def generate_orders(n=420):
    """
    Returns a list of dicts with keys:
      order_id, customer_id, order_date, state, category, payment,
      unit_price, quantity, discount_pct, shipping_days, returned, rating
    """
    base_date = dt.date(2025, 8, 1)
    orders = []
    for i in range(1, n+1):
        # skew categories a bit
        cat = _choice_weighted(CATEGORIES, [12, 11, 7, 8, 6, 5, 10, 4])
        state = _choice_weighted(STATES, [14, 12, 11, 9, 8, 7, 6, 6, 6, 5, 5, 4, 4, 4, 3])

        payment = _choice_weighted(PAYMENTS, [60, 18, 10, 8, 4])
        order_date = base_date + dt.timedelta(days=random.randint(0, 140))

        # price distribution by category (roughly realistic)
        if cat == "Electronics":
            unit_price = round(random.uniform(35, 1200), 2)
        elif cat == "Home":
            unit_price = round(random.uniform(8, 380), 2)
        elif cat == "Beauty":
            unit_price = round(random.uniform(5, 95), 2)
        elif cat == "Grocery":
            unit_price = round(random.uniform(2, 40), 2)
        elif cat == "Sports":
            unit_price = round(random.uniform(10, 260), 2)
        elif cat == "Books":
            unit_price = round(random.uniform(6, 55), 2)
        elif cat == "Clothing":
            unit_price = round(random.uniform(9, 180), 2)
        else:  # Toys
            unit_price = round(random.uniform(6, 120), 2)

        # quantity: mostly small, sometimes larger
        quantity = _choice_weighted([1,2,3,4,5,6,7,8,9,10], [45,26,10,6,4,3,2,2,1,1])

        # discount: many zero, some small, few larger
        discount_pct = _choice_weighted([0,5,10,15,20,25,30,40,50], [55,14,10,7,5,3,2,2,2])

        # shipping days: mostly 2–6, sometimes slower
        shipping_days = int(round(random.uniform(2, 6)))
        if random.random() < 0.08:
            shipping_days += random.randint(3, 8)

        # returns: influenced by category + shipping delay
        base_return_prob = {
            "Electronics": 0.10, "Home": 0.08, "Beauty": 0.05, "Grocery": 0.03,
            "Sports": 0.07, "Books": 0.04, "Clothing": 0.12, "Toys": 0.06
        }[cat]
        return_prob = base_return_prob + (0.02 if shipping_days >= 8 else 0.0)
        returned = (random.random() < return_prob)

        # rating: missing sometimes; worse if returned
        rating = None
        if random.random() > 0.12:
            mu = 4.2 - (0.9 if returned else 0.0) - (0.2 if shipping_days >= 7 else 0.0)
            raw = random.gauss(mu, 0.6)
            rating = max(1.0, min(5.0, round(raw, 1)))

        order = {
            "order_id": 10_000 + i,
            "customer_id": 2_000 + random.randint(1, 180),
            "order_date": order_date.isoformat(),  # keep as string for parsing practice
            "state": state,
            "category": cat,
            "payment": payment,
            "unit_price": unit_price,
            "quantity": quantity,
            "discount_pct": discount_pct,
            "shipping_days": shipping_days,
            "returned": returned,
            "rating": rating
        }
        orders.append(order)

    # Inject a few outliers + messy values (like real data)
    for idx in random.sample(range(n), 6):
        orders[idx]["unit_price"] = round(orders[idx]["unit_price"] * random.uniform(4, 12), 2)  # extreme price
    for idx in random.sample(range(n), 8):
        orders[idx]["shipping_days"] = orders[idx]["shipping_days"] + random.randint(10, 18)  # extreme delay
    for idx in random.sample(range(n), 10):
        orders[idx]["discount_pct"] = 60  # invalid (should be <= 50)
    for idx in random.sample(range(n), 8):
        orders[idx]["order_date"] = "2025-13-40"  # invalid date string
    for idx in random.sample(range(n), 10):
        orders[idx]["rating"] = "N/A"  # messy rating

    return orders

orders = generate_orders()
len(orders), orders[0]



# Part 1 code, this code should print the first 3 orders.

for i in range(3):
    print(f"\nDetails of order {i}: ", end = " ")
    for key,value in orders[i].items():
        print(f"|{key}: {value}", end = " ")

count = 0
#This code will count how many orders are from CA
for i in orders: 
    if 'state' in i and i['state'] == "CA":
        count = count +1
print ("There are " + str(count)+ " orders from CA\n")

amount = 0
#This code is to print out the amount of orders
for i in orders:
    if 'quantity' in i and i ['quantity'] >=5:
        amount += 1
print("There are " + str(amount)+ " orders of at least 5\n")

high_value_order_ids = []

number = 0

for i in orders:
    a = i['unit_price']
    b = i['quantity']

    if a*b >= 500:
        number += 1


print("There are " + str(number) + " orders that are high value, given the product of the unit price and quantity of the order is 500 or greater. \n")



#This code returns a safe float for whatever value is passed as a argument

def safe_float(x):
    try:
        float(x)
    except:
        print("There was an error converting the provided value into a float")
        return None
    x = float(x)
    return x


#This code will return the order subtotal for each order passed through using the formula
# unit_price*quantity

def order_subtotal(order):

    a = order['unit_price']
    b = order['quantity']
    
    subtotal = a*b

    return subtotal

def order_total(order):
    #return subtotal after discount. invalid discounts are returned as 0.
    
    
    if 'discount_pct' in order:
        dis = order['discount_pct']
    elif 'discount_pct_clean' in order:
        dis = order['discount_pct_clean']
    if dis is None:
        try:
            dis = order['discount_pct_clean']
        except:
            print('error with dicount percentage')
            return order
    

    if dis > 50 or dis < 0:
        dis = 0
    

    sub = order_subtotal(order)

    total = sub*(1-(dis/100))
    total = safe_float(total)

    return total

count = []

j = 1 

for i in orders:

    j+= 1

    count.append(j)
for i in range(5):

    j = random.choice(count)

    res = order_total(orders[i])

    print(f"for order {j}, the total will be {res:.2f}\n")

def clean_discount_pct(order):
    try: 
        order['discount_pct']

    except:
        print(f"Error with {order} discount_pct field")

        return None

    a = order['discount_pct']
    if a > 50: 
        a = 50
    order['discount_pct'] = a  

    return order

def parse_date(date_str):
    
    try:
        a = dt.datetime.strptime(date_str.strip(), '%Y-%m-%d').date()

        return a 
    except:
        print("error turning provided string into a date")
        return None


def clean_rating(x):
    a = safe_float(x)

    return a 

#a = orders[1]

#b = parse_date(a['order_date'])

#print(b)

clean_orders =[]

bad_date = 0
invalid_rating=0
count = 0 

#Create a new clean_orders where each order has order_date_obj(parsed date), has a discount_pct_clean, and rating_clean(cleaned rating)

#Print how many orders ahve invalid dates and how many have missing/invalid ratings

for i in orders:
    new = parse_date(i['order_date'])

    if new is None:
        bad_date+=1
    else:
        i['order_date'] = new
        i['order_date_obj'] = i.pop('order_date')
    
    new = clean_discount_pct(i)

    if i['discount_pct'] is None:
        print('error with discount pct')
    else:
        i['discount_pct_clean'] = i.pop('discount_pct')
    
    new = clean_rating(i['rating'])

    if new is None:
        print("error with rating")
        invalid_rating += 1
    else:
        i['rating'] = new
        i['rating_clean'] = i.pop('rating')

    if 'rating_clean' in i and 'discount_pct_clean' in i and 'order_date_obj' in i:
        clean_orders.append(i)

print(f"Here is the amount of orders with bad or missing ratings {invalid_rating}\n")
print(f"Here is the amount of orders with bad or missing dates {bad_date} \n")

ran = len(clean_orders)


"""
for i in range(ran):
    print(f"Details of order: {i} in clean_orders: \n")
    for key,value in clean_orders[i].items():
        print(f"{key}: {value}\n")
"""
#Create a list 'totals' with the order total for each order, use a cleaned discount for each of these.

totals = []
for i in orders:
    if 'discount_pct_clean' in i:
        total = order_total(i)
        totals.append(total)
    elif 'discount_pct' in i:
        i = clean_discount_pct(i)
        total = order_total(i)
        totals.append(total)
    else:
        continue




