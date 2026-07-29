import { createRspackConfig, createMFPlugin } from '@example/configs';

export default createRspackConfig({
    appDirName: 'app3',
    port: 3002,
    config: {
        plugins: [
            createMFPlugin({
                name: 'app3',
                exposes: {
                    './ChartView'      : './src/components/chartView.tsx',
                    './TableView'      : './src/components/tableView.tsx',
                    './KanbanBoard'    : './src/components/kanbanBoard.tsx',
                    './NotificationBar': './src/components/notificationBar.tsx',
                },
            }),
        ],
    },
});
