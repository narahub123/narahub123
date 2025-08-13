import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체임을 알려주는 데코레이터
export class User {
  @PrimaryGeneratedColumn() // pk이며 자동 증가
  id?: number;

  @Column({ unique: true }) // 유니크
  email: string;

  @Column({ nullable: true }) // 패스워드에 빈 값 허용
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // 기본값
  createdDt: Date = new Date();

  @Column({ nullable: true })
  providerId: string;
}
