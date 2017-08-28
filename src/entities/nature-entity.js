import Entity from 'mostly-entity';

const NatureEntity = new Entity('Nature', {
  type: { default: 'nature' }
});

NatureEntity.excepts('createdAt', 'updatedAt', 'destroyedAt');

export default NatureEntity.asImmutable();
