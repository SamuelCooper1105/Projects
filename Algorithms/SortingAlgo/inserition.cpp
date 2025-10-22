#include <iostream>
#include <vector>
using namespace std;


vector<int> insertion_sort(vector<int> nums){

    for(int i =1; i< nums.size(); ++i){
        int key = nums[i];

        int j = i-1;

        while(j >= 0&& nums[j] > key){

            nums[j+1] = nums[j];

            j = j - 1;
        }


        nums[j + 1 ]= key; 

        

    }

    return nums;


}




int main(){

    vector<int> nums = {4,5,3,7,2,1,0};

    vector<int> ans = insertion_sort(nums);

    for(int i = 0; i < ans.size(); ++i){
        cout <<"element["<<i<<"] is "<< ans[i]<< "\n";
    } 

    return 0;
}