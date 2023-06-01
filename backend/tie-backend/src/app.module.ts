import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [DbModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
