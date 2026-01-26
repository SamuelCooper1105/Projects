fn main(){
    let mut test = vec![437289, 8908, 264846, 346893270, 67, 69, 5748329 ];
    
    for element in test{
        println!("{}\n",element);}

    insert_sort(&mut test);
    
    for element in test {
        println!("{}\n", element);
    }
}


fn insert_sort(n: &mut Vec<i32>)-> &Vec<i32>{
    
    let len = n.len();
    
    for i in 1..len{
        let key = n[i];
        let mut j = (i -1) as i32;
        
        while j >= 0 && n[j as usize] > key {
            n[(j+1) as usize] = n[j as usize];
            j = j-1;
        }
        
       n[(j+1) as usize] = key;
        
    }
    
    n
    
}
