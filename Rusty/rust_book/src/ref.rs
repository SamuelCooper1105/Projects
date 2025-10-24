fn main(){
    let s1 = String::from("a string");

    let (s2, len) = calculate_length(s1);

    println!("The Length of '{s2}' is {len}.");
}




fn calculate_length(s: String)->(String, usize){

    let length = s.len();

    (s, length)

}