import { Cart } from '@/app/(entrepreneur)/_store/cartStore';

export type ProcessingType = {
	id: number;
	created_at: string;
	product_id: number;
	farmer_user_id: string;
	entrepreneur_user_id: string;
	status: string;
	product_obj: Cart;
	rider_user_id: string | null;
};

export interface ProcessLJProduct {
	id: number;
	created_at: string;
	product_id: string;
	entrepreneur_user_id: string;
	farmer_user_id: string;
	name: string;
	amount: number;
	category: string;
	purchase_quantity: number;
	status: string;
	img_link: string;
}
