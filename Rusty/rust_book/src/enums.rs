
#[derive(Debug)]
enum what_is_my_purpose{
    butter(u32),
    jam(String),

}

fn main(){
    let y = what_is_my_purpose::jam(String::from("I like strawberry jam"));

    println!("{y:#?}");

}