fn insert_sort(nums:&mut Vec<i32>)-> &mut Vec<i32>{
    for i in 1..nums.len(){

       let key = nums[i];

       let mut  j = (i -1) as i32;

       while j >= 0 && nums[j as usize] > key {

            
            nums[(j + 1 )as usize] = nums[j as usize];

            j = j -1;

       } 

        

        nums[(j+1)as usize] = key;

    }

    nums
}


fn main(){

    let mut vec = vec![5,8,1,7,4,3,9,2,6];

    let res = insert_sort(&mut vec);

    for ele in res.iter() {

        println!("{}", ele);

    }



}