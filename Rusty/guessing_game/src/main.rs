use std::io; // allows for accepting user input, brings io into scope

fn main(){

    println!("Guess the number!");

    println!("Would you please input a number");

    let mut guess = String::new();

    io::stdin()
    .read_line(&mut guess)//read_line is a method that takes user input and stores it in to guess, using a mutable reference

    .expect("Failed to read line");
    //read_line returns an enum named Return, .expect is a method defined on
    //if result is an err value, then .expect() returns whatever argument it is given as an error message
    
    println!("You guessed: {guess}");

}