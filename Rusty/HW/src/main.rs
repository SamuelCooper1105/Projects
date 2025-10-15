fn fib(n: u32)-> u32{
    let mut n_not = 0;
    let mut n_one = 1;
    let mut n_sum = 1;

    for i in 0..n-1{
        n_sum = n_one + n_not;

        n_not = n_one;
        n_one= n_sum;
    }

    n_sum
}

fn main(){
    let n = 6;

    let ans = fib(n);

    println!("The resulting fibonacci sequence at index {}, is {}", n, ans);
}