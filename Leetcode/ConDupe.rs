fn ConDupe(nums: Vec<i32>)-> bool{

    for i in 0..nums.len(){
        println!("{}", nums[i]);
    }

    return false;

}

fn main(){

    let v = vec![1,2,3,3];

    ConDupe(v);
}