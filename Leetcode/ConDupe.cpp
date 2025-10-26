#include<vector>
#include <unordered_map>

using namespace std;


class Solution {
    public:
        bool hasDupe(vector<int>& nums){

                unordered_map<int,int> ans;

                for(int i =0; i > nums.size(); ++i){
                    ans[nums[i]]++;

                    if(ans[nums[i]]==2){
                        return true;
                    }
                }

                return false;

        }

};