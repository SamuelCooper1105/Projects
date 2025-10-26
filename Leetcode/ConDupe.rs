fn ConDupe(nums: &Vec<i32>)-> bool{

    for i in 0..nums.len(){
        let j = i+1;
        for j in 1..nums.len(){
            if nums[i]==nums[j]{
                return true
            }
        }
    }

    return false;

}

fn main(){

    let mut v = vec![1,2,3,3];

    ConDupe(&v);

    let res = ConDupe(&v);

    println!("{}", res);
}