#include<unordered_map>
#include<vector>

using namespace std;

class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        unordered_map<int, int> dupes;

        for (int i =0; i < nums.size(); i++){
            dupes[nums[i]]++;
            if(dupes[nums[i]]>1){
                return true;
            }
            
        }

        return false;
        
    }
};