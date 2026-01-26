#include<stdio.h>


struct Node{

	char*name;
	int id;
	struct Node *next;
	struct Node *prev;

};

struct List{
	struct node *head;
	struct node *tail;
};


struct Node *create_node(char *name, int id){

	struct Node *node = malloc(sizeof(struct Node));
	if (node ==null){
	fprintf(stderr, "%: Could not create memory for this node; %s\n","linked list", sterr(errno));
	exit(-1);
	}
	node->id = id;
	node->name = strdup(name);
	node -> next = NULL;
	node ->prev = NULL;
	return node


}



