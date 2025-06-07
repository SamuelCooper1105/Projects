#include <vector>
#include <unordered_set>

class SolutionIGuess{
    public:
      bool hasDupe(const std::vector<int>& nums){
        std::unordered_set <int> Sol;

        for ( int n: nums){

            if(Sol.find(n) != Sol.end()){

                return true;
            }

            Sol.insert(n);

            }
            return false;
        }
    };
