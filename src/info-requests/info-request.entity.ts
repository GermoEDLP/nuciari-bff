import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('info_requests')
export class InfoRequest {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column({ length: 160 }) requester: string           // quién pide
  @Column({ length: 160 }) contactEmail: string
  @Column({ length: 50 }) type: 'stock' | 'price' | 'delivery' | 'other'
  @Column({ type: 'jsonb', default: {} }) payload: Record<string, any>
  @Column({ length: 40, default: 'open' }) status: 'open' | 'in_progress' | 'answered' | 'closed'

  @CreateDateColumn() createdAt: Date
}
