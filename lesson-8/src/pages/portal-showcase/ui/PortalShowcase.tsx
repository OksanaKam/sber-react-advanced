import { useState } from 'react';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog/ConfirmDialog';
import { useConfirmDialog } from '../../../shared/ui/ConfirmDialog/useConfirmDialog';
import { Tooltip } from '../../../shared/ui/Tooltip/Tooltip';
import { TooltipPosition } from '../../../shared/ui/Tooltip/TooltipPosition';
import './PortalShowcase.css';

export function PortalShowcase() {
  const [parentClicks, setParentClicks] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const { options, showConfirmDialog, handleResult } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Элемент будет удалён из этого примера.',
    });
    if (confirmed) {
      setIsDeleted(true);
    }
  };

  const handleParentClick = () => {
    setParentClicks((count) => count + 1);
  };

  return (
    <main className="showcase">
      <h1 className="showcase-title">Порталы в React</h1>
      <section className="showcase-card">
        <h2 className="showcase-card-title">Подсказка</h2>
        <p className="showcase-description">
          Наведение показывает подсказку. Клик по кнопке или фону области
          обрабатывает родитель.
        </p>
        <div className="event-demo" onClick={handleParentClick}>
          <p className="event-demo-label">Область родителя</p>
          <Tooltip
            content="Подсказка с использованием портала"
            position={TooltipPosition.Top}
          >
            <button type="button" className="showcase-button">Кнопка с подсказкой</button>
          </Tooltip>
        </div>
        <p className="showcase-result" aria-live="polite">
          Кликов, обработанных родителем: {parentClicks}
        </p>
      </section>
      <section className="showcase-card">
        <h2 className="showcase-card-title">Подтверждение удаления</h2>
        <p className="showcase-description" aria-live="polite">
          {isDeleted ? 'Элемент удалён.' : 'Элемент для удаления'}
        </p>
        {isDeleted ? (
          <button type="button" className="showcase-button" onClick={() => setIsDeleted(false)}>
            Восстановить пример
          </button>
        ) : (
          <button type="button" className="showcase-button" onClick={handleDelete}>
            Удалить
          </button>
        )}
      </section>
      {options && <ConfirmDialog {...options} onResult={handleResult} />}
    </main>
  )
}
