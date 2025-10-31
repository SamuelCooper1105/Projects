#include<iostream>;


struct Node{
    int data;
    struct Node* next;
    struct Node* prev;
};

int main(){
    Node* head = new Node();
    Node* sec = new Node();
    Node* thi = new Node();
    Node* fou = new Node();
    Node* fiv = new Node();

    head->data=0;
    head->next = sec;
    head->prev = nullptr;

    
    
    sec->data =1;
    sec->next= thi;
    sec->prev = head;

    
    
    thi->data=2;
    thi->next = fou;
    thi->prev= sec;

    
    
    fou-> data =3;
    fou->next=fiv;
    fou->prev=thi;

    
    
    fiv->data =4;
    fiv->next= nullptr;
    fiv->prev = fou;

    Node* current = head;

    while(current != nullptr){
        std::cout<<current -> data<<" | ";
        Node*placeholder = current;

        current = current -> next;
        
        if(current == nullptr){
            current = placeholder->prev;

            while (current != nullptr){
                std::cout<<current->data<<" | ";
                current = current->prev;
            }
        }

    }

  

    return 0;
}