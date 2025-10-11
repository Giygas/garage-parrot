export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			contacts: {
				Row: {
					created_at: string;
					email: string;
					first_name: string;
					id: number;
					last_name: string;
					message: string;
					responded: boolean;
					telephone: string;
					voiture_id: string | null;
				};
				Insert: {
					created_at?: string;
					email: string;
					first_name: string;
					id?: number;
					last_name: string;
					message: string;
					responded?: boolean;
					telephone: string;
					voiture_id?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string;
					first_name?: string;
					id?: number;
					last_name?: string;
					message?: string;
					responded?: boolean;
					telephone?: string;
					voiture_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'contacts_voiture_id_fkey';
						columns: ['voiture_id'];
						isOneToOne: false;
						referencedRelation: 'voitures';
						referencedColumns: ['id'];
					}
				];
			};
			horaires: {
				Row: {
					day: string;
					hours: string;
					id: number;
				};
				Insert: {
					day: string;
					hours: string;
					id?: never;
				};
				Update: {
					day?: string;
					hours?: string;
					id?: never;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					id: string;
					name: string;
					role_type: number;
				};
				Insert: {
					id: string;
					name: string;
					role_type?: number;
				};
				Update: {
					id?: string;
					name?: string;
					role_type?: number;
				};
				Relationships: [];
			};
			services: {
				Row: {
					description: string;
					id: number;
					title: string;
				};
				Insert: {
					description: string;
					id?: never;
					title: string;
				};
				Update: {
					description?: string;
					id?: never;
					title?: string;
				};
				Relationships: [];
			};
			temoignages: {
				Row: {
					approved: boolean;
					approved_by: string | null;
					created_at: string;
					id: number;
					message: string;
					name: string;
					rating: number;
				};
				Insert: {
					approved?: boolean;
					approved_by?: string | null;
					created_at?: string;
					id?: never;
					message: string;
					name: string;
					rating: number;
				};
				Update: {
					approved?: boolean;
					approved_by?: string | null;
					created_at?: string;
					id?: never;
					message?: string;
					name?: string;
					rating?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'temoignages_responded_by_fkey';
						columns: ['approved_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'temoignages_responded_by_fkey';
						columns: ['approved_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			voitures: {
				Row: {
					created_at: string;
					created_by: string | null;
					doors: number | null;
					engine: string | null;
					id: string;
					image: string;
					kilometrage: number;
					options: string[] | null;
					other_images: string[] | null;
					power: number | null;
					price: number;
					seats: number | null;
					title: string;
					traction: string | null;
					transmission: number | null;
					year: number;
				};
				Insert: {
					created_at?: string;
					created_by?: string | null;
					doors?: number | null;
					engine?: string | null;
					id?: string;
					image: string;
					kilometrage: number;
					options?: string[] | null;
					other_images?: string[] | null;
					power?: number | null;
					price: number;
					seats?: number | null;
					title: string;
					traction?: string | null;
					transmission?: number | null;
					year: number;
				};
				Update: {
					created_at?: string;
					created_by?: string | null;
					doors?: number | null;
					engine?: string | null;
					id?: string;
					image?: string;
					kilometrage?: number;
					options?: string[] | null;
					other_images?: string[] | null;
					power?: number | null;
					price?: number;
					seats?: number | null;
					title?: string;
					traction?: string | null;
					transmission?: number | null;
					year?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'voiture_transmission_fk';
						columns: ['transmission'];
						isOneToOne: false;
						referencedRelation: 'voitures_transmission';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'voitures_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'voitures_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			voitures_transmission: {
				Row: {
					description: string;
					id: number;
				};
				Insert: {
					description: string;
					id?: number;
				};
				Update: {
					description?: string;
					id?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			users: {
				Row: {
					created_at: string | null;
					deleted_at: string | null;
					email: string | null;
					id: string | null;
					last_sign_in_at: string | null;
					name: string | null;
				};
				Relationships: [];
			};
		};
		Functions: {
			get_users_for_current_user: {
				Args: Record<PropertyKey, never>;
				Returns: {
					created_at: string;
					deleted_at: string;
					email: string;
					id: string;
					last_sign_in_at: string;
					name: string;
				}[];
			};
			is_admin: {
				Args: { id: string };
				Returns: boolean;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
	? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
	? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
	? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
	? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
	: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
	? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
	: never;

export const Constants = {
	public: {
		Enums: {}
	}
} as const;
