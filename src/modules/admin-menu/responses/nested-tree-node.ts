export interface INestedTreeNode {
	name: string;
	href?: string;
	icon?: string;
	children?: INestedTreeNode[];
}