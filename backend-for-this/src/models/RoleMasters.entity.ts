import { Column, Table, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, Model, BelongsTo, BelongsToMany, HasMany, HasOne } from "sequelize-typescript";

@Table({
  tableName: 'tbl_role_masters',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role_slug: string; 

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
