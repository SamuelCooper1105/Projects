struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String)-> User{

    User{
        active:true,
        username,
        email,
        sign_in_count: 1,
    }

}

fn main(){
    let mut user1 = User{
        active: true,
        username: String::from("johndoe123"),
        email: String::from("someones@emai.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("someother dude");

    let user2 = User{
        email: String::from("someother@email.com"),
        ..user1
    };

    

}