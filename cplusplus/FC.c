#include <stdio.h>

int main(){

	float F, C;
	int l, u, s;

	l = 0;
	u=300;
	s=20;

	F = l;
	printf("F values \t C Values\n");
	while (F <= u){

		C =(5.0/9.0)*(F-32.0);
		printf("%3.0f\t\t%6.2f\n", F,C);
		F = F + s;

	}

}
