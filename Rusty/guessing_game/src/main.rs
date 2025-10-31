use std::io; // allows for accepting user input, brings io into scope
use rand::Rng;
use std::cmp::Ordering;

fn main(){

    println!("Guess the number!");

    let secret = rand::thread_rng().gen_range(1..=100);

    println!("{secret}");

    println!("Would you please input a number");

    let mut guess = String::new();

    io::stdin()
    .read_line(&mut guess)//read_line is a method that takes user input and stores it in to guess, using a mutable reference

    .expect("Failed to read line");
    //read_line returns an enum named Return, .expect is a method defined on
    //if result is an err value, then .expect() returns whatever argument it is given as an error message

    let guess: i32 = guess.trim().parse().expect("please type a number, dumbass this is not hard");

    println!("You guessed: {guess}");

    match guess.cmp(&secret){
        Ordering::Less => println!("Too small, (atleastthastwhatshesaid)"),
        Ordering::Greater => println!("Too big, (atleastthatswhatsheNEVERsaid)"),
        Ordering::Equal => println!("You won!"),
    }

}