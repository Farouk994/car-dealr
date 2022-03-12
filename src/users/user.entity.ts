import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  //? @Hooks Decorators in nestJs
  // Decorator applied to a method defined inside the entity
  // Whenever User is inserted this method will always run and log in console
  @AfterInsert()
  logInsert() {
    console.log('Inserted User', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User', this.id);
  }
}
