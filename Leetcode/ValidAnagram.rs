use std::collections::HashMap;

fn valid_anagram(s: String, t: String)->bool{
    if s.len() != t.len() {
        return false;
    }

    let mut sh: HashMap<char, i32>= HashMap::new();
    let mut th: HashMap<char, i32>= HashMap::new();

    for c in s.chars(){
        sh.entry(c)+=1;

    }

    for c in t.chars(){
        th.entry(c)+=1;
    }

    return th==sh 



    
}

fn main(){
    let s= String::from("racecar");
    let t = String::from("carrace");

    let ans = valid_anagram(s,t);

    println!("{}", ans);
}