#include<iostream>
#include<cmath>

int main(){

    int hour;
    
    std::cout<< "Please input the hour you would like to wake up at: ";
    std::cin>> hour;

    if(hour < 0 || hour > 23){
        std::cout<< "Invalid hour. Please enter a value between 0 and 23." << std::endl;
        return 1; // Exit the program with an error code
    }
     int minutes;
    std::cout<< "Please input the minutes you would like to wake up at: ";
    std::cin>> minutes;

    if(minutes < 0 || minutes > 59){
        std::cout<< "Invalid number of minutes, please input a number between 0 and 59." << std::endl;
        return 1;

    }

    std::cout<<"Your Alarm is set for: " << hour << ":"<< minutes;
    return 0;

    

}