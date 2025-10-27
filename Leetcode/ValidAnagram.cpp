#include<vector>
#include<unordered_map>
#include<iostream>

using namespace std;

bool valid_anagram(string s, string t);

int main(){

    bool ans= valid_anagram("jam","jas");

    cout<<ans<< "\n";

    return 0;

}

bool valid_anagram(string s, string t){

    if(s.length()!=t.length()){
        return false;
    }

    unordered_map<char, int> hash_s;
    unordered_map<char, int> hash_t;

    for(int i =0; i < s.length(); ++i){

        hash_s[s[i]]++;
        hash_t[t[i]]++;
    }

    if(hash_s==hash_t){
        return true;
    }

    return false;

}