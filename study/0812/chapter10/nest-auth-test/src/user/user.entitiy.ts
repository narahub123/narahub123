import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체임을 알려주는 데코레이터
export class User {
  @PrimaryGeneratedColumn() // pk이며 자동 증가
  id?: number;

  @Column({ unique: true }) // 유니크
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // 기본값
  createdDt: Date = new Date();
}
