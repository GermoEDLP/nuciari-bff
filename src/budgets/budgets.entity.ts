import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column({ length: 160 }) clientName: string
  @Column({ length: 160 }) clientEmail: string

  @Column({ type: 'jsonb', default: [] }) items: Array<{ sku: string; qty: number; unitPrice: number }>
  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 }) total: string

  @Column({ length: 40, default: 'draft' }) status: 'draft' | 'sent' | 'approved' | 'rejected'
  @Column({ nullable: true }) notes?: string

  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date
}
